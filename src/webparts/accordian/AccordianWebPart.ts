import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "AccordianWebPartStrings";
import Accordian from "./components/Accordian";
import { IAccordianProps } from "./components/IAccordianProps";

import {
  PropertyFieldCollectionData,
  CustomCollectionFieldType,
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";

export interface IAccordianWebPartProps {
  collectionData: any[];
}

export default class AccordianWebPart extends BaseClientSideWebPart<IAccordianWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IAccordianProps> = React.createElement(
      Accordian,
      {
        collectionData: this.properties.collectionData,
        displayMode:this.displayMode,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                              
                PropertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: "",
                  panelHeader: "Add tabs to accordian header",
                  manageBtnLabel: "Manage tabs",
                  value: this.properties.collectionData,   
                  enableSorting:true,               
                  fields: [
                    {
                      id: "Title",
                      title: "Tab title",
                      type: CustomCollectionFieldType.string,
                      required: true
                    },
                    {
                      id: "Expand",
                      title: "Default expand",
                      type: CustomCollectionFieldType.boolean,
                      required: false
                    }
                  ],
                  disabled: false
                })
              ],
            },
          ],
        },
      ],
    };
  }
}
