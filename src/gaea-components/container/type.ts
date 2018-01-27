export class Props {
  public gaeaSetting = {
    key: "gaea-container",
    name: "容器",
    isContainer: true,
    editors: [
      "布局",
      {
        text: "边距",
        type: "box-editor"
      },
      "基本",
      {
        field: "style.backgroundColor",
        text: "背景颜色",
        type: "color"
      },
      {
        field: "style.opacity",
        text: "透明度",
        type: "number",
        data: {
          useSlider: true,
          step: 1,
          inputRange: [0, 100],
          outputRange: [0, 1]
        }
      }
    ]
  }

  public style: React.CSSProperties = {
    display: "flex",
    minWidth: 100,
    minHeight: 100
  }
}

export class State { }
