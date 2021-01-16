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
        className: `float-right btn-grey align-top leading-none ${
          button.class ?? ""
        }`,
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
    console.log(index % 2);
    return (
      <li key={key} className="relative py-2 px-2 rounded hover:bg-gray-100">
        {listItem}
        {btn}
      </li>
    );
  });
  let listComp;
  if (content?.length == 0)
    listComp = <div className="text-gray-400 text-center">{emptyMessage}</div>;
  else
    listComp = React.createElement(
      ordered ? "ol" : "ul",
      {
        className: `ml-5 list-inside ${ordered ? "list-decimal" : "list-disc"}`,
      },
      list
    );
  return (
    <div className={`card ${className ?? ""}`}>
      <div className="card-header">{title}</div>
      {listComp}
    </div>
  );
}
