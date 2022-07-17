import axios from 'axios';
import { getAPIBaseUrl } from '../helpers/utils.helper';
import EventService from './event.service';

class UtilsService {
    private static inst?: UtilsService;

    public isShownPopupIds: string[];

    constructor() {
        this.isShownPopupIds = [];
    }

    public static get instance(): UtilsService {
        if (!UtilsService.inst) UtilsService.inst = new UtilsService();
        return UtilsService.inst;
    }

    public confirm = async (message: string): Promise<boolean> => {
        return new Promise(resolve => {
            const handleOnAnswerTheConfirmation = (data: unknown): void => {
                resolve(Boolean(data));
                EventService.instance.onAnswerTheConfirmation.removeEventListener(handleOnAnswerTheConfirmation);
            };

            EventService.instance.onRequestShowConfirmation.trigger({
                message,
            });
            EventService.instance.onAnswerTheConfirmation.addEventListener(handleOnAnswerTheConfirmation);
        });
    }

    public alert = async (message: string): Promise<void> => {
        EventService.instance.onRequestShowConfirmation.trigger({
            message,
            alert: true,
        });
    }

    public uploadFile = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append('file', file);
        try {
            const res = await axios.post(
                `${getAPIBaseUrl()}/upload-file`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return String(res.data);
        } catch (e) {
            return '';
        }
    }
}

export default UtilsService;