import { create } from "zustand";
import PageDev from "../materials/Page/dev";
import PageProd from "../materials/Page/prod";
import ContainerDev from "../materials/Container/dev";
import ContainerProd from "../materials/Container/prod";
import ButtonDev from "../materials/Button/dev";
import ButtonProd from "../materials/Button/prod";
import ModalDev from "../materials/Model/dev";
import ModalProd from "../materials/Model/prod";
import TableDev from "../materials/Table/dev";
import TableProd from "../materials/Table/prod";
import TableColumnDev from "../materials/TableColumn/dev";
import TableColumnProd from "../materials/TableColumn/prod";
import FormProd from "../materials/Form/prod";
import FormDev from "../materials/Form/dev";
export interface ComponentSetter {
  type: string;
  label: string;
  name: string;
  [key: string]: any;
}
export interface ComponentEvent {
  label: string;
  name: string;
}
export interface ComponentMethod {
  name: string;
  label: string;
}
export interface ComponentConfigs {
  name: string;
  defaultProps: any;
  component: any;
  desc: string;
  setter?: ComponentSetter[];
  stylesSetter?: ComponentSetter[];
  events?: ComponentEvent[];
  methods?: ComponentMethod[];
  dev: any;
  prod: any;
}
export interface State {
  componentConfig: Record<string, ComponentConfigs>;
}
export interface Action {
  registerComponentConfig: (name: string, item: ComponentConfigs) => void;
}
export const useComponentConfigsStore = create<State & Action>((set) => ({
  componentConfig: {
    Page: {
      name: "Page",
      defaultProps: {},
      component: PageDev,
      dev: PageDev,
      prod: PageProd,
      desc: "页面",
    },
    Container: {
      name: "Container",
      defaultProps: {},
      component: ContainerDev,
      dev: ContainerDev,
      prod: ContainerProd,
      desc: "容器",
      stylesSetter: [
        {
          name: "width",
          type: "inputNumber",
          label: "宽度",
        },
        {
          name: "height",
          type: "inputNumber",
          label: "高度",
        },
      ],
    },
    Button: {
      name: "Button",
      defaultProps: {
        type: "primary",
        text: "按钮",
      },
      component: ButtonDev,
      dev: ButtonDev,
      prod: ButtonProd,
      desc: "按钮",
      setter: [
        {
          name: "type",
          label: "按钮类型",
          type: "select",
          options: [
            { label: "主按钮", value: "primary" },
            { label: "次按钮", value: "default" },
          ],
        },
        { name: "text", label: "文本", type: "input" },
      ],
      stylesSetter: [
        {
          name: "width",
          type: "inputNumber",
          label: "宽度",
        },
        {
          name: "height",
          type: "inputNumber",
          label: "高度",
        },
      ],
      events: [
        {
          label: "单击事件",
          name: "onClick",
        },
        {
          label: "双击事件",
          name: "onDoubleClick",
        },
      ],
    },
    Modal: {
      name: "Modal",
      defaultProps: {
        title: "modal",
      },
      setter: [
        {
          type: "input",
          label: "标题",
          name: "title",
        },
      ],
      stylesSetter: [
        {
          type: "inputNumber",
          name: "width",
          label: "宽度",
        },
        {
          type: "inputNumber",
          name: "height",
          label: "高度",
        },
      ],
      events: [
        {
          label: "确认事件",
          name: "onOk",
        },
        { label: "取消事件", name: "onCancel" },
      ],
      methods: [
        { name: "open", label: "打开弹窗" },
        { name: "close", label: "关闭弹窗" },
      ],
      component: ModalDev,
      dev: ModalDev,
      prod: ModalProd,
      desc: "弹窗",
    },
    Table: {
      name: "Table",
      defaultProps: {},
      setter: [
        {
          type: "input",
          label: "url",
          name: "url",
        },
      ],
      component: TableDev,
      dev: TableDev,
      prod: TableProd,
      desc: "表格",
    },
    TableColumn: {
      name: "TableColumn",
      defaultProps: {
        title: "column",
        dataIndex: `col_${new Date().getTime()}`,
        type: "text",
      },
      setter: [
        {
          type: "input",
          label: "标题",
          name: "title",
        },
        {
          type: "select",
          label: "类型",
          name: "type",
          options: [
            { label: "文本", value: "text" },
            { label: "日期", value: "date" },
          ],
        },
        {
          name: "dataIndex",
          label: "字段",
          type: "input",
        },
      ],
      component: TableColumnDev,
      dev: TableColumnDev,
      prod: TableColumnProd,
      desc: "表格列",
    },
    Form: {
      name: "Form",
      defaultProps: {},
      setter: [
        {
          type: "input",
          label: "标题",
          name: "title",
        },
      ],
      events: [
        {
          label: "结束事件",
          name: "onFinish",
        },
      ],
       methods: [
        { name: "submit", label: "提交" },
      ],
      component: FormDev,
      dev: FormDev,
      prod: FormProd,
      desc: "表单",
    },
    FormItem: {
      name: "FormItem",
      defaultProps: {
        label: "xxx",
        name: `col_${new Date().getTime()}`,
        type: "input",
      },
      setter: [
        {
          type: "input",
          label: "字段",
          name: "name",
        },
        {
          type: "input",
          label: "label",
          name: "label",
        },
        {
          type: "select",
          label: "类型",
          name: "type",
          options: [
            { label: "密码", value: "password" },
            { label: "日期", value: "date" },
            { label: "输入框", value: "input" },
          ],
        },
        {
          type: "select",
          label: "校验",
          name: "rules",
          options: [{ label: "必填", value: "required" }],
        },
      ],
      component: FormDev,
      dev: FormDev,
      prod: FormDev,
      desc: "表单项",
    },
  },
  registerComponentConfig: (name: string, item: ComponentConfigs) => {
    set((state) => {
      return {
        ...state,
        componentConfig: { ...state.componentConfig, [name]: item },
      };
    });
  },
}));
