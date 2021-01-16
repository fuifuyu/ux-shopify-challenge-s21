import React from "react";

export function CardWithList({
  title,
  ordered = false,
  content = [],
  button,
  className,
  emptyMessage,
  contentFactory,
  disableContent,
  disableAll,
}) {
  const list = content.map((c, index) => {
    const { listItem, key } = contentFactory
      ? contentFactory(c)
      : { listItem: c, key: index };
    let btn = React.createElement(
      "button",
      {
        className: `ml-2 btn-grey ${button.class ?? ""}`,
        onClick: () => button.onClick(c),
        disabled:
          disableAll ||
          disableContent?.find((dc) => {
            const dcKey = contentFactory(dc).key;
            return key == dcKey;
          }) != undefined,
      },
      button.text
    );
    return (
      <li key={key} className="my-2">
        {listItem}
        {btn}
      </li>
    );
  });
  let listComp;
  if (content?.length == 0) listComp = emptyMessage;
  else
    listComp = React.createElement(
      ordered ? "ol" : "ul",
      {
        className: `ml-5 list-inside ${ordered ? "list-decimal" : "list-disc"}`,
      },
      list
    );
  return (
    <div className={`card ${className}`}>
      <div className="card-header">{title}</div>
      {listComp}
    </div>
  );
}
