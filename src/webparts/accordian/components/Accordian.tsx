import * as React from "react";
import { IAccordianProps } from "./IAccordianProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { Accordion } from "@pnp/spfx-controls-react/lib/Accordion";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";
import { DisplayMode } from '@microsoft/sp-core-library';

export default class Accordian extends React.Component<IAccordianProps, {}> {
  public render(): React.ReactElement<IAccordianProps> {
    if(this.props.collectionData){
    return (
      <>
        {this.props.collectionData.map((tab, index) => (
          <Accordion
            title={tab.Title}
            defaultCollapsed={!tab.Expand}
            className={"itemCell"}
            key={"index"}
          >
            <RichText
              isEditMode={this.props.displayMode==DisplayMode.Edit}
              value={tab.Content}
              onChange={(value) =>
                (this.props.collectionData[index].Content = value)
              }
            />
          </Accordion>
        ))}
      </>
    );
    }

    return (
      <div>No data</div>
     );
  }
}
