// Minecraft MOTD Parser for raw and section-sign strings

const MC_COLORS: Record<string, string> = {
  '0': '#000000',
  '1': '#0000aa',
  '2': '#00aa00',
  '3': '#00aaaa',
  '4': '#aa0000',
  '5': '#aa00aa',
  '6': '#ffaa00',
  '7': '#aaaaaa',
  '8': '#555555',
  '9': '#5555ff',
  'a': '#55ff55',
  'b': '#55ffff',
  'c': '#ff5555',
  'd': '#ff55ff',
  'e': '#ffff55',
  'f': '#ffffff',
};

export interface MotdSpan {
  text: string;
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
}

export function parseMotd(text: string): MotdSpan[] {
  if (!text) return [];

  const parts = text.split(/§([0-9a-fk-or])/gi);
  const spans: MotdSpan[] = [];

  let currentColor: string | undefined = undefined;
  let bold = false;
  let italic = false;
  let underline = false;
  let strikethrough = false;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (i % 2 === 1) {
      // This is the code
      const code = part.toLowerCase();
      if (code in MC_COLORS) {
        currentColor = MC_COLORS[code];
      } else if (code === 'l') {
        bold = true;
      } else if (code === 'm') {
        strikethrough = true;
      } else if (code === 'n') {
        underline = true;
      } else if (code === 'o') {
        italic = true;
      } else if (code === 'r') {
        currentColor = undefined;
        bold = false;
        italic = false;
        underline = false;
        strikethrough = false;
      }
    } else {
      // This is the text
      if (part) {
        spans.push({
          text: part,
          color: currentColor,
          bold,
          italic,
          underline,
          strikethrough,
        });
      }
    }
  }

  return spans.length > 0 ? spans : [{ text }];
}
