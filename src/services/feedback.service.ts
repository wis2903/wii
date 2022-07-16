import EventService from './event.service';
import FirebaseService from './firebase.service';

class FeedbackService {
    private static inst?: FeedbackService;

    public static get instance(): FeedbackService {
        if (!FeedbackService.inst) FeedbackService.inst = new FeedbackService();
        return FeedbackService.inst;
    }

    public send = async (email: string, content: string): Promise<void> => {
        return new Promise(resolve => {
            EventService.instance.onRequestShowLoader.trigger(true);
            FirebaseService.instance.addDocument('feedbacks', {
                email,
                content,
            }).then(() => {
                setTimeout(() => {
                    resolve();
                    EventService.instance.onRequestShowLoader.trigger(false);
                }, 500);
            });
        });
    }
}

export default FeedbackService;