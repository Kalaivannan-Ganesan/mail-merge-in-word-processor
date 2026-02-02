import { createRoot } from 'react-dom/client';
import './index.css';
import * as React from 'react';
import { useEffect, useRef } from 'react';

import { DocumentEditorContainerComponent, Toolbar } from '@syncfusion/ej2-react-documenteditor';
import { TitleBar } from './title-bar';

import { DialogUtility, Dialog } from '@syncfusion/ej2-react-popups';
import { ListView } from '@syncfusion/ej2-react-lists';
DocumentEditorContainerComponent.Inject(Toolbar);
// tslint:disable:max-line-length
const MailMerge = () => {
    useEffect(() => {
        rendereComplete();
    }, []);
    let hostUrl = "https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/";
    let container = useRef(null);
    let titleBar;
    const onWrapText = (text) => {
        let content = "";
        let index = text.lastIndexOf(" ");
        content = text.slice(0, index);
        text.slice(index);
        content += '<div class="e-de-text-wrap">' + text.slice(index) + "</div>";
        return content;
    };
    let toolbarOptions = [
        "New",
        "Open",
        "Separator",
        "Undo",
        "Redo",
        "Separator",
        {
            prefixIcon: "sf-icon-InsertMergeField",
            tooltipText: "Insert Field",
            text: onWrapText("Insert Field"),
            id: "InsertField",
        },
        {
            prefixIcon: "sf-icon-FinishMerge",
            tooltipText: "Merge Document",
            text: onWrapText("Merge Document"),
            id: "MergeDocument",
        },
        "Separator",
        "Image",
        "Table",
        "Hyperlink",
        "Bookmark",
        "TableOfContents",
        "Separator",
        "Header",
        "Footer",
        "PageSetup",
        "PageNumber",
        "Break",
        "Separator",
        "Find",
        "Separator",
        "Comments",
        "TrackChanges",
        "Separator",
        "LocalClipboard",
        "RestrictEditing",
        "Separator",
        "FormFields",
        "UpdateFields",
    ];
    let listview;
    let field;
    const closeFieldDialog = () => {
        insertFieldDialogObj.hide();
        container.current.documentEditor.focusIn();
    };
    let insertFieldDialogObj = new Dialog({
        header: "Merge Field",
        content: '<div class="dialogContent">' +
            // tslint:disable-next-line:max-line-length
            '<label class="e-insert-field-label">Name:</label></br><input type="text" id="field_text" class="e-input" placeholder="Type a field to insert eg. FirstName">' +
            "</div>",
        showCloseIcon: true,
        isModal: true,
        width: "auto",
        height: "auto",
        close: closeFieldDialog,
        buttons: [
            {
                click: () => {
                    let fieldNameTextBox = document.getElementById("field_text");
                    let fieldName = fieldNameTextBox.value;
                    if (fieldName !== "") {
                        container.current.documentEditor.editor.insertField("MERGEFIELD " + fieldName + " \\* MERGEFORMAT");
                    }
                    insertFieldDialogObj.hide();
                    container.current.documentEditor.focusIn();
                },
                buttonModel: {
                    content: "Ok",
                    cssClass: "e-flat",
                    isPrimary: true,
                },
            },
            {
                click: () => {
                    insertFieldDialogObj.hide();
                    container.current.documentEditor.focusIn();
                },
                buttonModel: {
                    content: "Cancel",
                    cssClass: "e-flat",
                },
            },
        ],
    });
    let Data;
    const onLoadDefault = () => {
        // tslint:disable
        let defaultDocument = { sfdt:"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"};
        // tslint:enable
        container.current.documentEditor.open(JSON.stringify(defaultDocument));
        container.current.documentEditor.documentName = "Mail Merge";
        container.current.documentEditorSettings.showRuler = true;
        let item = toolbarOptions;
        container.current.toolbarItems = item;
        titleBar.updateDocumentTitle();
        container.current.documentChange = () => {
            titleBar.updateDocumentTitle();
            container.current.documentEditor.focusIn();
        };
        document
            .getElementById("listview")
            .addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("Text", event.target.innerText);
            event.target.classList.add("de-drag-target");
        });
        // Prevent default drag over for document editor element
        document
            .getElementById("container")
            .addEventListener("dragover", (event) => {
            event.preventDefault();
        });
        // Drop Event for document editor element
        document.getElementById("container").addEventListener("drop", (e) => {
            let text = e.dataTransfer.getData("Text");
            container.current.documentEditor.selection.select({
                x: e.offsetX,
                y: e.offsetY,
                extend: false,
            });
            insertField(text);
        });
        document.addEventListener("dragend", (event) => {
            if (event.target.classList.contains("de-drag-target")) {
                event.target.classList.remove("de-drag-target");
            }
        });
        Data = [
            {
                text: "ProductName",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "ShipName",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "CustomerID",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "Quantity",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "UnitPrice",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "Discount",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "ShipAddress",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "ShipCity",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "ShipCountry",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "OrderId",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
            {
                text: "OrderDate",
                category: "Drag or click the field to insert.",
                htmlAttributes: { draggable: true },
            },
        ];
        let listDivElement = document.getElementById("listview");
        const onSelect = (args) => {
            let fieldName = args.text;
            listView.selectItem(undefined);
            insertField(fieldName);
        };
        let listView = new ListView({
            dataSource: Data,
            fields: { tooltip: "category" },
            select: onSelect.bind(this),
        });
        listView.appendTo(listDivElement);
        container.current.toolbarClick = (args) => {
            switch (args.item.id) {
                case "MergeDocument":
                    mergeDocument();
                    break;
                case "InsertField":
                    showInsertFielddialog(container);
                    break;
            }
        };
    };
    const mergeDocument = () => {
        container.current.documentEditor.saveAsBlob("Docx").then((blob) => {
            let exportedDocumment = blob;
            let fileReader = new FileReader();
            fileReader.onload = () => {
                let base64String = fileReader.result;
                let responseData = {
                    fileName: container.current.documentEditor.documentName + ".docx",
                    documentData: base64String,
                };
                // let waitingPopUp:HTMLElement = document.getElementById('waiting-popup');
                // let inActiveDiv:HTMLElement = document.getElementById('popup-overlay');
                showHideWaitingIndicator(true);
                let baseUrl = "https://document.syncfusion.com/web-services/docx-editor/api/documenteditor/MailMerge";
                let httpRequest = new XMLHttpRequest();
                httpRequest.open("POST", baseUrl, true);
                httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                httpRequest.onreadystatechange = () => {
                    if (httpRequest.readyState === 4) {
                        if (httpRequest.status === 200 || httpRequest.status === 304) {
                            container.current.documentEditor.open(httpRequest.responseText);
                        }
                        else {
                            // Failed to merge document
                            DialogUtility.alert({
                                title: "Information",
                                content: "failure to merge document",
                                showCloseIcon: true,
                                closeOnEscape: true,
                            });
                        }
                        showHideWaitingIndicator(false);
                    }
                };
                httpRequest.send(JSON.stringify(responseData));
            };
            fileReader.readAsDataURL(blob);
        });
    };
    const showHideWaitingIndicator = (show) => {
        let waitingPopUp = document.getElementById("waiting-popup");
        let inActiveDiv = document.getElementById("popup-overlay");
        inActiveDiv.style.display = show ? "block" : "none";
        waitingPopUp.style.display = show ? "block" : "none";
    };
    const showInsertFielddialog = (container) => {
        let instance = this;
        if (document.getElementById("insert_merge_field") === null ||
            document.getElementById("insert_merge_field") === undefined) {
            let fieldcontainer = document.createElement("div");
            fieldcontainer.id = "insert_merge_field";
            document.body.appendChild(fieldcontainer);
            insertFieldDialogObj.appendTo("#insert_merge_field");
            fieldcontainer.parentElement.style.position = "fixed";
            fieldcontainer.style.width = "auto";
            fieldcontainer.style.height = "auto";
        }
        insertFieldDialogObj.close = () => {
            container.documentEditor.focusIn();
        };
        insertFieldDialogObj.beforeOpen = () => {
            container.documentEditor.focusIn();
        };
        insertFieldDialogObj.show();
        let fieldNameTextBox = document.getElementById("field_text");
        fieldNameTextBox.value = "";
    };
    const insertField = (fieldName) => {
        let fileName = fieldName
            .replace(/\n/g, "")
            .replace(/\r/g, "")
            .replace(/\r\n/g, "");
        let fieldCode = "MERGEFIELD  " + fileName + "  \\* MERGEFORMAT ";
        container.current.documentEditor.editor.insertField(fieldCode, "«" + fieldName + "»");
        container.current.documentEditor.focusIn();
    };
    const onSelect = (args) => {
        let fieldName = args.text;
        //this.listview.selectItem(undefined);
        insertField(fieldName);
    };
    const rendereComplete = () => {
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
        container.current.documentEditor.pageOutline = "#E0E0E0";
        container.current.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();
        titleBar = new TitleBar(document.getElementById("documenteditor_titlebar"), container.current.documentEditor, true);
        onLoadDefault();
    };
    return (<div className="control-pane">
            <div className="control-section">
                <div id="documenteditor_titlebar" className="e-de-ctn-title"></div>
                <div className="col-lg-2 control-section" style={{
            paddingRight: "inherit",
            paddingTop: "0px",
            paddingLeft: "5px",
            height: "590px",
            borderLeft: "1px solid rgb(238, 238, 238)",
            borderBottom: "1px solid rgb(238, 238, 238)",
        }}>
                    <h5>
                        <label style={{ display: "block", margin: "1px", paddingTop: "5px" }}>
                            Select Field to Insert
                        </label>
                    </h5>
                    <div id="listview"></div>
                </div>
                <div className="col-lg-10 control-section" style={{ paddingLeft: "0px", paddingRight: "0px", paddingTop: "0px" }}>
                    <DocumentEditorContainerComponent id="container" ref={container} style={{ display: "block" }} height={"590px"} serviceUrl={hostUrl} enableToolbar={true} locale="en-US"/>
                </div>
            </div>

            <div className="overlay" id="popup-overlay"></div>
            <div id="waiting-popup">
                <svg className="circular" height="40" width="40">
                    <circle className="circle-path" cx="25" cy="25" r="20" fill="none" strokeWidth="6" strokeMiterlimit="10"/>
                </svg>
            </div>
        </div>);
};
export default MailMerge;

const root = createRoot(document.getElementById('sample'));
root.render(<MailMerge />);