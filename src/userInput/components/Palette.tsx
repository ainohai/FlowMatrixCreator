import { h } from 'htm/preact';
import { Rgb } from '../../entities/entityTypes';

type PaletteProps = {
  palette: Rgb[]
};
export function Palette({ palette }: PaletteProps) {
  return (
    <div style={{display: "block"}}>
      {palette.length && (palette.map(paletteColor =>
        <div style={{ display:"inline-block", width: 10, height: 10, borderRadius: "50%", backgroundColor: `rgb(${paletteColor.r}, ${paletteColor.g}, ${paletteColor.b})` }} />
      ))}
    </div>
  );
}
