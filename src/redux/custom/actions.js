/**
 * Action的集合
 * Created by BadWaka on 2017/3/15.
 */

/**
 * 修改习惯项完成状态Action
 * @param customItemId  习惯项的id
 * @return {{type: string, id: *}}
 */
export const changeCustomItemCompletionStatusAction = (customItemId) => {
    return {
        type: 'CHANGE_CUSTOM_ITEM_COMPLETION_STATUS_ACTION',
        id: customItemId
    };
};

/**
 * 添加习惯项Action
 * @param customItemText    要添加的习惯项的文本
 * @return {{type: string, text: *}}
 */
let nextId = 0;
export const addCustomItemAction = (customItemText) => {
    return {
        type: 'ADD_CUSTOM_ITEM_ACTION',
        text: customItemText,
        id: nextId++
    };
};
