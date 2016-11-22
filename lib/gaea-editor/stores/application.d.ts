import { PropsDefine } from '../gaea-editor.type';
export default class ApplicationStore {
    init(props: PropsDefine, plugins: Array<FitGaea.Plugin>): void;
    customComponents?: Array<React.ComponentClass<FitGaea.ComponentProps>>;
    editorProps?: PropsDefine;
    navbarHeight: number;
    plugins: FitGaea.Plugin[];
    pageValue: string;
    viewportStyle: React.CSSProperties;
    viewportContainerStyle: React.CSSProperties;
    inPreview: boolean;
}
