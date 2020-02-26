export class Utils {
    static  OK = 'OK';
    static SUCCESS = 'Success';
    static ERROR = 'Error';
    static ALPHANUMERIC = '^[a-zA-Z0-9_]+$';
    static EMAIL = '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$';
    static NEW_EMAIL = '^\w+@\w+\..{2,3}(.{2,3})?$';
    static FLOATING_POINT = '[-+]?[0-9]*\.?[0-9]+.?';
    static PHONE_NUMBER = '^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$';
    static NUMBERS = '^(?=.*?[0-9])[0-9]+$';
    static WEBSITE = '^((https?|ftp|smtp):\/\/)?(www\.|WWW\.)?[a-zA-Z0-9]+\.[a-zA-Z]+(\/[a-zA-Z0-9#]+\/?)*$';
    static MAX_CHAR = 255;
    static MAX_DIGIT = 11;
    static MAX_DIGIT_TEN = 10;
    static NONE = 'NONE';
    static READ = 'READ';
    static READ_WRITE = 'READ_WRITE';
    static ALERT_TIMEOUT = 3000; // mili sec
    static WAIT_TIMEOUT = 1000; // mili sec
    static PERCENTAGE = '^0*(?:[1-9][0-9]?|100)$';
}
