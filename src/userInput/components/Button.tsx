import { h } from 'htm/preact';

type ButtonProps = {
  title: string;
  onClick: () => void;
  disabled?: boolean
};
export function Button({ title, onClick, disabled }: ButtonProps) {
  return (
    <div style={{ display: "block", margin: "5px 3px" }}>
      <button
        disabled={disabled} 
        className={"button-small"}
        onClick={() => onClick()}>
        {title}
      </button>
    </div>
  );
}

