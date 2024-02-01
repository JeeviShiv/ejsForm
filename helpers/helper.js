var date = require('date-and-time');
const now = new Date();
const SGmail = require('@sendgrid/mail');
let status ='';

module.exports = {
    getOrderStatus(orderedDate){
        const yesterday = date.addDays(now, -1);
        const orderedDateString = new Date(orderedDate);          
        const yesterdayString = new Date(yesterday);     
        const currentDateString = new Date();     
        if(date.isSameDay(currentDateString, orderedDateString)){
            status ="In progress";
        }
        else if(date.isSameDay(yesterdayString, orderedDateString)){
            status ="Dispatched"; 
        }
        else{
            status ="Delivered";
        }
        return status;
    },
    formatDate(orderedDate){
       return date.format(orderedDate, 'YYYY/MM/DD')
    },
    SendMail(data){
        console.log(data.email)
        SGmail.setApiKey('');
        const message = {
            to: data.email,
            from: { email: 'info@gmail.com', name: 'Info' },
            subject: 'Order Information',
            html: '<h1>Thanks for  your purchase'
        };
        return SGmail.send(message).then(sent => {
        // Awesome Logic to check if mail was sent
            console.log('Welcome mail was sent');
        }).catch(err => {
                console.log('Error sending mail', err);
        });

    }
};
