import styled from 'styled-components';

export const Container = (styled.div as any).withConfig({ componentId: 'main-tool-container' })`
  display: flex;
  flex-grow: 1;
  height: 100%;
  .ant-tabs {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .ant-tabs-content {
    flex-grow: 1;
  }
  .ant-tabs-nav .ant-tabs-tab {
    padding: 10px 16px;
  }
  .ant-tabs-bar {
    margin-bottom: 0;
    height: 40px;
    min-height: 40px;
  }
`;

export const ScrollContainer = styled.div`
  display: block;
  overflow-x: hidden;
  overflow-y: auto;
  height: 100%;
  width: 300px;
`;
