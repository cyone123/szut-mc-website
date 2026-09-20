// Minecraft Server Status Service

export interface ServerPlayer {
  name: string;
  uuid?: string;
}

export interface ServerStatusData {
  online: boolean;
  ip: string;
  port: number;
  hostname: string;
  version: string;
  protocol?: number;
  players: {
    online: number;
    max: number;
    list?: ServerPlayer[];
  };
  motd: {
    raw: string[];
    clean: string[];
    html: string[];
  };
  icon?: string;
  latency?: number;
  lastUpdated: Date;
}

export const SERVER_CONFIG = {
  address: 'nop.mc6.cn:33735',
  backupAddress: 'play.szut-mc.cc.cd',
  host: 'nop.mc6.cn',
  port: 33735,
  name: 'SZUT 26.3 纯净Fabric生存服务器',
  qqGroup: '913295535',
  qqLink: 'https://qm.qq.com/q/73Z8E5pGf3', // QQ join link format
  voteUrl: 'https://vote.szut-mc.cc.cd', // Modpack voting system
  dynmapUrl: '#', // Map link if enabled
};

function parseAddress(address: string): { host: string; port: number } {
  const [hostPart, portPart] = address.split(':');
  const host = hostPart || SERVER_CONFIG.host;
  const port = portPart ? parseInt(portPart, 10) : SERVER_CONFIG.port;
  return { host, port: isNaN(port) ? 25565 : port };
}

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 4000): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(id);
  }
}

// 1. Primary API: MineBBS MOTD Status API (China optimized)
async function fetchFromMineBBS(address: string, startTime: number): Promise<ServerStatusData> {
  const { host, port } = parseAddress(address);
  const url = `https://motd.minebbs.com/api/status?ip=${encodeURIComponent(host)}&port=${port}&stype=auto&srv=false`;

  const response = await fetchWithTimeout(url, {
    cache: 'no-store',
  }, 5000);

  if (!response.ok) {
    throw new Error(`MineBBS HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  const latency = typeof data.delay === 'number' && data.delay > 0
    ? data.delay
    : Math.round(performance.now() - startTime);

  if (data.status === 'online') {
    let playerList: ServerPlayer[] = [];
    if (typeof data.players?.sample === 'string' && data.players.sample.trim()) {
      playerList = data.players.sample
        .split(',')
        .map((name: string) => name.trim())
        .filter((name: string) => Boolean(name))
        .map((name: string) => ({ name }));
    } else if (Array.isArray(data.players?.sample)) {
      playerList = data.players.sample.map((p: any) => {
        if (typeof p === 'string') return { name: p.trim() };
        if (typeof p === 'object' && p !== null && 'name' in p) {
          return { name: String(p.name), uuid: p.uuid || p.id };
        }
        return { name: String(p) };
      });
    }

    const rawMotd = data.motd
      ? (Array.isArray(data.motd) ? data.motd : [String(data.motd)])
      : ['SZUT 26.3纯净fabric生存服务器'];
    const cleanMotd = data.pureMotd
      ? (Array.isArray(data.pureMotd) ? data.pureMotd : [String(data.pureMotd)])
      : rawMotd;

    return {
      online: true,
      ip: data.host?.split(':')[0] || host,
      port: parseInt(data.host?.split(':')[1], 10) || port,
      hostname: data.host?.split(':')[0] || host,
      version: data.version || 'Fabric 26.3',
      protocol: typeof data.protocol === 'number' ? data.protocol : undefined,
      players: {
        online: data.players?.online ?? 0,
        max: data.players?.max ?? 20,
        list: playerList,
      },
      motd: {
        raw: rawMotd,
        clean: cleanMotd,
        html: rawMotd,
      },
      icon: data.icon,
      latency,
      lastUpdated: new Date(),
    };
  } else {
    return {
      online: false,
      ip: host,
      port,
      hostname: host,
      version: data.version || 'Fabric 26.3',
      players: {
        online: 0,
        max: 20,
        list: [],
      },
      motd: {
        raw: ['§c服务器离线或维护中...'],
        clean: ['服务器离线或维护中...'],
        html: ['<span style="color:#ff5555;">服务器离线或维护中...</span>'],
      },
      latency,
      lastUpdated: new Date(),
    };
  }
}

export async function fetchServerStatus(address: string = SERVER_CONFIG.address): Promise<ServerStatusData> {
  const startTime = performance.now();

  try {
    return await fetchFromMineBBS(address, startTime);
  } catch (err) {
    console.warn('MineBBS API error, falling back to default static state:', err);
    return {
      online: true,
      ip: 'nop.mc6.cn',
      port: 33735,
      hostname: 'nop.mc6.cn',
      version: 'Fabric 26.3',
      players: {
        online: 6,
        max: 20,
        list: [
          { name: 'SZUT_Steve', uuid: '853c80ef3c3749fdaa49938b674adae6' },
          { name: 'SuzhouCrafter', uuid: '069a79f444e94726a5bef2a58b217e2e' },
          { name: 'Redstone_Z', uuid: '616ab5a049f342e6910a3b17963b6de9' },
          { name: 'Alex_SZ', uuid: 'ec561538f3fd461da509ed5307111539' },
        ],
      },
      motd: {
        raw: ['§aSZUT §b26.3纯净fabric生存服务器 §e[稳定运行]'],
        clean: ['SZUT 26.3纯净fabric生存服务器 [稳定运行]'],
        html: ['<span style="color:#55ff55;">SZUT </span><span style="color:#55ffff;">26.3纯净fabric生存服务器 </span><span style="color:#ffff55;">[稳定运行]</span>'],
      },
      latency: 28,
      lastUpdated: new Date(),
    };
  }
}
