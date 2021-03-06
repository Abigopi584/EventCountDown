import React from 'react';
import {ControlLabel,Button} from 'react-bootstrap'

export default class setEvtCountDown extends React.Component{
    constructor(props) {
        super(props);
        this.state=({
            eventDate: this.props.eventDate,
            currentDate: new Date(),
            eventCountDown:  this.props.eventDate,
            eventExpired: false,
            evtSec:0
        })
    }
    componentWillMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    tick(){
        const currentDate = new Date();
        const evtDt =new Date(this.state.eventDate);

        // month in date Method is from 0 to 11 based where as date and year is from 1. go figure.
        let eventMonth = evtDt.getUTCMonth()+1;
        let eventDt = evtDt.getUTCDate();
        let eventYear = evtDt.getUTCFullYear();

        let currentHours  = currentDate.getHours();
        let currentMin = currentDate.getMinutes();
        let currentSec = currentDate.getSeconds();
        const currentDte= currentDate.getUTCDate();
        const currentMonth = currentDate.getUTCMonth()+1;
        const currentYear = currentDate.getUTCFullYear();
        let yearsMonthsDays = ''

        const hoursForEvt = 24 - currentHours;
        const minForEvt= 60 - currentMin;
        const secForEvt= 60-currentSec;

        if( eventYear > currentYear ){
            if(eventMonth > currentMonth){
                yearsMonthsDays =  this.yearGrtMthGrt(eventDt,currentDte,eventMonth , currentMonth,eventYear , currentYear)
            }
            else if(eventMonth < currentMonth ){
                yearsMonthsDays = this.sameYrMonthLt(currentMonth,eventMonth,currentDte, eventDt );
            }
            else {
                yearsMonthsDays = this.sameYrSameMth(eventDt,currentDte,currentMonth);
            }
        }
        // check if the event is in the same year
        else if(eventYear === currentYear){
            // Check if the event is happening in the same year future month
            if(eventMonth > currentMonth){
                yearsMonthsDays=this.yearsSameMonthGr(eventDt,currentDte,eventMonth , currentMonth)
            }
            // Check if the event is happening in the same year past month
            else if(eventMonth < currentMonth ){
                yearsMonthsDays = this.sameYrMonthLt(currentMonth,eventMonth,currentDte, eventDt );
            }
            // Check if the event is happening in the same year same month
            else {
                yearsMonthsDays = this.sameYrSameMth(eventDt,currentDte,currentMonth);
            }
        }
        // check if the event happened in the past
        else if(eventYear < currentYear ){
            if(eventMonth > currentMonth){
                // eventYear = currentYear;
                yearsMonthsDays=this.yearsSameMonthGr(eventDt,currentDte,eventMonth , currentMonth)
            }
            else if(eventMonth < currentMonth) {
                //   eventYear = currentYear +1;
                yearsMonthsDays = this.sameYrMonthLt(currentMonth,eventMonth,currentDte, eventDt, eventYear );
            }
            else {
                yearsMonthsDays = this.sameYrSameMth(eventDt,currentDte,currentMonth);
            }
        }
        if ( yearsMonthsDays !== "'Remind you Again!!!'"){
            this.setState({
                eventCountDown:yearsMonthsDays+ ' '+ hoursForEvt + ' H ' +  minForEvt + ' m ' + secForEvt + ' s'
            })
        }
        else{
            this.setState({
                eventExpired: true
            })
        }


    }
    yearGrtMthGrt(eventDt,currentDate,eventMonth , currentMonth,eventYear , currentYear){

        let yearsMonthsDays = '';
        let convYrToMth = ((eventYear - currentYear) * 12);
        if(eventDt > currentDate){
            yearsMonthsDays = ( (convYrToMth + (eventMonth - currentMonth) + ' M ' + (eventDt - currentDate ) +  ' D '))
        }
        else if(eventDt < currentDate){
            yearsMonthsDays = ((convYrToMth +  (eventMonth -1)) +  ' M ' +
            (eventDt) + ' D')
        }
        else {
            yearsMonthsDays = ((convYrToMth +(eventMonth - currentMonth))+ ' M ')
        }
        return yearsMonthsDays;
    }
    yearsSameMonthGr(eventDt,currentDate,eventMonth , currentMonth){
        let yearsMonthsDays = '';
        if(eventDt > currentDate){
            yearsMonthsDays = ((eventMonth - currentMonth)+ ' M ' + (eventDt - currentDate ) +  ' D ')
        }
        else if(eventDt < currentDate){
            yearsMonthsDays = ((eventMonth -1) +  ' M ' + (eventDt) + ' D')
        }
        else {
            yearsMonthsDays = ((eventMonth - currentMonth)+ ' M ')
        }
        return yearsMonthsDays;
    }

    sameYrMonthLt(currentMonth,eventMonth,currentDate, eventDt,currentYear ){
        let yearsMonthsDays = '';
        let MonthsInAYr =12;
        let daysLeftInCurrentMonth =0;
        let TotalNoAddedMonths = 0;
        let totalDaysLeft = 0;

        if(eventDt === currentDate ){
            yearsMonthsDays=((( MonthsInAYr- currentMonth ) +  eventMonth) + ' M ');
        }
        else {
            if ((currentMonth === 1) || (currentMonth === 3) || (currentMonth === 5) || (currentMonth === 7) ||
                (currentMonth === 8) || (currentMonth === 10) || (currentMonth === 12)) {
                daysLeftInCurrentMonth = 31 - currentDate

            }
            else if ((currentMonth === 2)) {
                if ((currentYear % 4) == 0) {
                    daysLeftInCurrentMonth = 29 - currentDate
                }
                else {
                    daysLeftInCurrentMonth = 28 - currentDate
                }

            }
            else {
                daysLeftInCurrentMonth = 30 - currentDate;
            }
            totalDaysLeft = daysLeftInCurrentMonth + eventDt;

            if (totalDaysLeft >= 30) {
                TotalNoAddedMonths += 1;
                totalDaysLeft = totalDaysLeft - 30;
            }
            TotalNoAddedMonths = TotalNoAddedMonths + (((MonthsInAYr - currentMonth) - 1) + eventMonth);
            yearsMonthsDays = (TotalNoAddedMonths + ' M ' + totalDaysLeft + ' D ')
        }
        return yearsMonthsDays
    }
    sameYrSameMth(eventDt,currentDate,currentMonth){
        let yearsMonthsDays = '';
        if(eventDt > currentDate){
            yearsMonthsDays = ( eventDt -  currentDate ) + ' D '
        }
        else if(eventDt < currentDate){
            let daysLeftInCurrentMonth =0;
            let totalDaysLeft = 0;
            let TotalNoAddedMonths=0;

            if ( (currentMonth === 1) || (currentMonth === 3) || (currentMonth === 5) || (currentMonth === 7) ||
                (currentMonth === 8) || (currentMonth === 10) || (currentMonth === 12)) {
                daysLeftInCurrentMonth = 31- currentDate
            }
            else if((currentMonth === 2)){
                if((currentYear % 4) == 0 ){
                    daysLeftInCurrentMonth = 29- currentDate
                }
                else {
                    daysLeftInCurrentMonth = 28- currentDate
                }
            }
            else {
                daysLeftInCurrentMonth = 30 -currentDate;
            }
            totalDaysLeft = daysLeftInCurrentMonth + eventDt;
            if (totalDaysLeft > 30){
                TotalNoAddedMonths +=1;
                totalDaysLeft = totalDaysLeft - 30;
            }
            if(TotalNoAddedMonths === 0){
                yearsMonthsDays = totalDaysLeft + ' D ';
            }
            else
                yearsMonthsDays = TotalNoAddedMonths + ' M '+ totalDaysLeft + ' D ';
        }
        else{
            yearsMonthsDays = 'Remind you Again!!!'
        }

        return yearsMonthsDays;
    }
    render(){
        const eventExpired = this.state.eventExpired;
        return(
            <div>
                {eventExpired ?(
                        <Button> Remind Me Again</Button>
                    ): (
                        <ControlLabel bsClass="setTimer">
                            {this.state. eventCountDown}
                        </ControlLabel>
                    )
                }
            </div>

        )
    }

}