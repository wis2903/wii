class NotificationService {
    private static inst?: NotificationService;

    private showNotificationListeners: VoidFunction[];

    constructor() {
        this.showNotificationListeners = [];
    }

    public static get instance(): NotificationService {
        if (!NotificationService.inst) NotificationService.inst = new NotificationService();
        return NotificationService.inst;
    }

    public addShowNotificationListeners = (callback: VoidFunction): void => {
        this.showNotificationListeners.push(callback);
    }

    public removeShowNotificationListeners = (callback: VoidFunction): void => {
        this.showNotificationListeners = this.showNotificationListeners.filter(item => item !== callback);
    }

    public requestShowNotification = (): void => {
        this.showNotificationListeners.forEach(callback => { callback(); });
    }
}

export default NotificationService;