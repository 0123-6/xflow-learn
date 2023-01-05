import type { NsJsonSchemaForm } from '@antv/xflow'
import { EditorShape } from './custom-editor'
import { LinkShape } from './link'
import {MuitiSelectShape} from "./muiti-select";
import {SelectMuiti} from "./select-muiti";

/** 自定义form控件 */
export enum ControlShapeEnum {
    'MUITISELECT' = 'MUITISELECT',
    'EDITOR' = 'EDITOR',
    'LINKSHAPE' = 'LINKSHAPE',
    'SELECTMUITI' = 'SELECTMUITI',
}

export const controlMapService: NsJsonSchemaForm.IControlMapService = controlMap => {
    controlMap.set(ControlShapeEnum.EDITOR, EditorShape)
    controlMap.set(ControlShapeEnum.LINKSHAPE, LinkShape)
    controlMap.set(ControlShapeEnum.MUITISELECT,MuitiSelectShape)
    controlMap.set(ControlShapeEnum.SELECTMUITI,SelectMuiti)

    return controlMap
}
