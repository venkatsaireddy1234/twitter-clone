export default function SideBarMenuItem({ text,Icon,active,itemClick }) {
  return (
    <div
    onClick={itemClick}
    className="hoverEffect flex items-center justify-center xl:justify-start space-x-3 text-lg"
    >
      <Icon className="h-7" />
      <span className={`${active && "font-bold"} hidden xl:inline`}>{text}</span>
    </div>
  );
}
