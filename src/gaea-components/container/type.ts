export class Props {
  public editSetting = {
    key: 'gaea-container',
    name: 'Container',
    isContainer: true,
    editors: [
      'Layout',
      {
        type: 'display'
      },
      {
        type: 'box-editor'
      },
      'Style',
      {
        field: 'style.backgroundColor',
        text: 'BackgroundColor',
        type: 'color'
      },
      {
        field: 'style.opacity',
        text: 'Opacity',
        type: 'number',
        data: {
          useSlider: true,
          step: 1,
          inputRange: [0, 100],
          outputRange: [0, 1]
        }
      }
    ]
  };

  public style: React.CSSProperties = {
    display: 'flex',
    minWidth: 100,
    minHeight: 100
  };
}

export class State {}
