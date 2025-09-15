import type { ReactNode } from "react";
import { useComponentsStore, type Component } from "../../stores/components";
import { useComponentConfigsStore } from "../../stores/componentsConfig";
import React, { useRef } from "react";
import { message } from "antd";
import type { GotoLinkConfig } from "../Setting/action/GoToLink";
import type { ShowMessageConfig } from "../Setting/action/ShowMessage";
import type { ActionConfig } from "../Setting/ActionModel";

export function Preview() {
  const [messageApi, contextHolder] = message.useMessage();
  const { components } = useComponentsStore();
  const { componentConfig } = useComponentConfigsStore();
  const allRef = useRef<Record<string, any>>({});
  function handleEvent(component: Component) {
    const props: Record<string, any> = {};
    componentConfig[component.name].events?.forEach((item) => {
      const eventName = component.props[item.name];
      if (eventName) {
        console.log("preview set click event", item.name);
        props[item.name] = (...args:any[]) => {
          console.log(eventName.actions);
          (eventName.actions || []).map((everyConfig: ActionConfig) => {
            const { type } = everyConfig;
            if (type === "goToLink" && everyConfig.url) {
              window.location.href = everyConfig.url;
            } else if (type === "showMessage" && everyConfig.config) {
              if (everyConfig.config.type === "success") {
                messageApi.success(everyConfig.config.text, 1000);
              } else if (everyConfig.config.type === "error") {
                messageApi.error(everyConfig.config.text, 1000);
              }
            } else if (type === "customJs" && everyConfig.code) {
              const func = new Function("context",'args', everyConfig.code);
              func({
                name: component.name,
                props: component.props,
                showMessage(content: string) {
                  messageApi.success(content);
                },
              },args);
            } else if (type === "componentMethod" && everyConfig.config) {
              const comp = allRef.current[everyConfig.config.id];
              console.log("action type componentMethod");
              if (comp?.[everyConfig.config.method]) {
                comp[everyConfig.config.method](...args);
              }
            }
          });
        };
      }
    });
    console.log(props);
    return props;
  }
  function renderComponent(components: Component[]): ReactNode {
    return components.map((item: Component) => {
      const init = componentConfig[item.name];
      if (!init.prod) {
        return null;
      }
      return React.createElement(
        init.prod,
        {
          key: item.id,
          id: item.id,
          name: item.name,
          ...item.props,
          ref: (ref: Record<string, any>) => {
            allRef.current[item.id] = ref;
          },
          ...handleEvent(item),
          styles: { ...item.styles },
        },
        renderComponent(item.children || [])
      );
    });
  }
  return (
    <div>
      {contextHolder}
      {renderComponent(components)}
    </div>
  );
}
