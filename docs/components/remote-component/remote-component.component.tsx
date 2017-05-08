import { RemoteComponent as RC } from "@ali/remote-component"
import * as React from "react"
import * as ReactDOM from "react-dom"

class Props {
  public gaeaSetting = {
    key: "gaea-rc",
    name: "RC卡片"
  }
}

class State { }

export default class RemoteComponent extends React.Component<Props, State> {
  public static defaultProps = new Props()
  public state = new State()

  public render() {
    return (
      <RC
        namespace="contentRanking"
        isLoading={false}
        order="desc"
        orderKey="feedUv"
        cardId="83fsl3"
        numPerPage={10}
        title="内容排行"
        defaultIndexes={["feedUv", "feedPv"]}
        indexes={["feedUv", "feedPv"]}
        urls={{
          main: `/xsite/feed/rank/summary.json`,
          tableDataUrl: `/xsite/feed/rank.json`
        }}
      />
    )
  }
}
