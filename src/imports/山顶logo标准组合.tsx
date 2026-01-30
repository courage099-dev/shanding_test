import svgPaths from "./svg-qca5njrue3";

function Group() {
  return (
    <div className="absolute inset-[20%_12.5%_20.22%_12.5%]" data-name="Group">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 600 239.119">
        <g id="Group">
          <path d={svgPaths.p12177500} fill="var(--fill-0, #C1603D)" id="Vector" />
          <g id="Group_2">
            <path d={svgPaths.p3464f700} fill="var(--fill-0, #232323)" id="Vector_2" />
            <path d={svgPaths.p51bd500} fill="var(--fill-0, #232323)" id="Vector_3" />
          </g>
          <g id="Group_3">
            <path d={svgPaths.p3ad4b680} fill="var(--fill-0, #232323)" id="Vector_4" />
            <path d={svgPaths.p2c1ed900} fill="var(--fill-0, #232323)" id="Vector_5" />
            <path d={svgPaths.p1a787c00} fill="var(--fill-0, #232323)" id="Vector_6" />
            <path d={svgPaths.p3b5c02c0} fill="var(--fill-0, #232323)" id="Vector_7" />
            <path d={svgPaths.p3f133f00} fill="var(--fill-0, #232323)" id="Vector_8" />
            <path d={svgPaths.p39fa8980} fill="var(--fill-0, #232323)" id="Vector_9" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="absolute contents inset-[20%_12.5%_20.22%_12.5%]" data-name="logo">
      <Group />
    </div>
  );
}

export default function logo() {
  return (
    <div className="bg-white relative size-full" data-name="山顶logo-标准组合">
      <Logo />
    </div>
  );
}