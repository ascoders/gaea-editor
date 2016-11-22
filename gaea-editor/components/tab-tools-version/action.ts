import { action, inject, transaction, observable } from '../../../gaea-editor-manager/gaea-editor-manager'

import TabToolsVersionStore from './store'

export default class TabToolsVersionAction {
    @inject('TabToolsVersionStore') private tabToolsVersion: TabToolsVersionStore

    @observable observeClass = true

    @action('设置当前版本列表业务') setCurrentVersionPage(page: number) {
        this.tabToolsVersion.currentVersionPage = page
    }

    @action('添加版本') addVersions(versions: Array<FitGaea.GetPublishListResult>) {
        transaction(() => {
            versions && versions.forEach(version => {
                this.tabToolsVersion.versionList.push(version)
            })
        })
    }

    @action('设置当前最新版本号') setCurrentVersion(version: string) {
        this.tabToolsVersion.currentVersion = version
    }

    @action('增加刚刚发布的版本到版本列表中') publishToVersionList(versionInfo: FitGaea.GetPublishListResult) {
        // 如果还没有获取过版本信息，不需要添加，添加再获取最新的内容就重复了
        if (this.tabToolsVersion.versionList.length > 0) {
            this.tabToolsVersion.versionList.unshift(versionInfo)
        }
    }
}