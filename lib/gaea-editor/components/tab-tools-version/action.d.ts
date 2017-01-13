export default class TabToolsVersionAction {
    private tabToolsVersion;
    observeClass: boolean;
    setCurrentVersionPage(page: number): void;
    addVersions(versions: Array<FitGaea.GetPublishListResult>): void;
    setCurrentVersion(version: string): void;
    publishToVersionList(versionInfo: FitGaea.GetPublishListResult): void;
}
