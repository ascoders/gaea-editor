import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Styled from './icon.style';
import * as typings from './icon.type';

import add from '../icons/add';
import addFile from '../icons/add-file';
import addFolder from '../icons/add-folder';
import border from '../icons/border';
import borderRadius from '../icons/border-radius';
import centerLine from '../icons/center-line';
import close from '../icons/close';
import component from '../icons/component';
import dashed from '../icons/dashed';
import database from '../icons/database';
import displayBlock from '../icons/display-block';
import displayFlex from '../icons/display-flex';
import displayInline from '../icons/display-inline';
import displayInlineBlock from '../icons/display-inline-block';
import dotted from '../icons/dotted';
import edit from '../icons/edit';
import eye from '../icons/eye';
import eyeSlash from '../icons/eye-slash';
import file from '../icons/file';
import flexAlignCenter from '../icons/flex-align-center';
import flexAlignStart from '../icons/flex-align-start';
import flexAlignStretch from '../icons/flex-align-stretch';
import flexBaseline from '../icons/flex-baseline';
import flexDirectionCenter from '../icons/flex-direction-center';
import flexDirectionEnd from '../icons/flex-direction-end';
import flexRow from '../icons/flex-row';
import flexSpaceAround from '../icons/flex-space-around';
import flexSpaceBetween from '../icons/flex-space-between';
import folder from '../icons/folder';
import keybroad from '../icons/keybroad';
import page from '../icons/page';
import positionRelative from '../icons/position-relative';
import reload from '../icons/reload';
import remove from '../icons/remove';
import rightArrow from '../icons/right-arrow';
import setting from '../icons/setting';
import solid from '../icons/solid';
import textAlignLeft from '../icons/text-align-left';
import trash from '../icons/trash';
import underLine from '../icons/under-line';

const iconMap = new Map<string, (size: number) => React.ReactElement<any>>();
iconMap.set('close', close);
iconMap.set('page', page);
iconMap.set('component', component);
iconMap.set('folder', folder);
iconMap.set('file', file);
iconMap.set('addFile', addFile);
iconMap.set('addFolder', addFolder);
iconMap.set('setting', setting);
iconMap.set('remove', remove);
iconMap.set('trash', trash);
iconMap.set('add', add);
iconMap.set('keybroad', keybroad);
iconMap.set('database', database);
iconMap.set('rightArrow', rightArrow);
iconMap.set('edit', edit);
iconMap.set('borderRadius', borderRadius);
iconMap.set('border', border);
iconMap.set('centerLine', centerLine);
iconMap.set('dashed', dashed);
iconMap.set('displayBlock', displayBlock);
iconMap.set('displayFlex', displayFlex);
iconMap.set('displayInlineBlock', displayInlineBlock);
iconMap.set('displayInline', displayInline);
iconMap.set('dotted', dotted);
iconMap.set('eye', eye);
iconMap.set('flexAlignStart', flexAlignStart);
iconMap.set('flexBaseline', flexBaseline);
iconMap.set('flexDirectionCenter', flexDirectionCenter);
iconMap.set('flexDirectionEnd', flexDirectionEnd);
iconMap.set('flexRow', flexRow);
iconMap.set('flexSpaceAround', flexSpaceAround);
iconMap.set('flexSpaceBetween', flexSpaceBetween);
iconMap.set('positionRelative', positionRelative);
iconMap.set('reload', reload);
iconMap.set('solid', solid);
iconMap.set('textAlignLeft', textAlignLeft);
iconMap.set('underLine', underLine);
iconMap.set('eyeSlash', eyeSlash);
iconMap.set('flexAlignCenter', flexAlignCenter);
iconMap.set('flexAlignStretch', flexAlignStretch);

export class Icon extends React.Component<typings.Props, typings.State> {
  public static defaultProps = new typings.Props();
  public state = new typings.State();

  public render() {
    return (
      <Styled.Container className={this.props.className}>
        {iconMap.get(this.props.type)(this.props.size)}
      </Styled.Container>
    );
  }
}
