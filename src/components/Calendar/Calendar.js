import React from 'react';
import {useState, useCallback, useEffect} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import {Link, Redirect} from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ru';

import {addOneEvent} from '../../services';
import {getAllEvents} from '../../services';
import {updateOneEvent} from '../../services';

import './Calendar.css';

const BigCalendar = () => {

    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('admin');

    const [myEvents, setMyEvents] = useState([
        {
            start: '',
            end: '',
            title: '',
        }
    ]);

    const newEvent = myEvents?.map((el) =>
        (
            {
                start: new Date(Date.parse(el.start)),
                end: new Date(Date.parse(el.end)),
                title: el.title,
                id: el._id
            }
        )

    );

    const handleSelect = ({start, end}) => {
        const title = window.prompt('Please, enter new event name');
        if (title) {
            let newEvent = {
                start: new Date(Date.parse(start)),
                end: new Date(Date.parse(end)),
                title: title
            }
            setMyEvents([...myEvents, newEvent]);
            setEvent(newEvent)
        }
    };

    const eventSelected = (e) => {
        const title = window.prompt('Rename title of this event');
        if (title) {
            let newEvent = {
                id: e.id,
                title: title
            }
            setMyEvents([...myEvents, newEvent]);
            updateEvent(newEvent)
            window.location.reload();
        }
    }

    const islogout = () => {
        localStorage.setItem('token', JSON.stringify([]))
        localStorage.setItem('admin', JSON.stringify([]))
        localStorage.removeItem('token', JSON.stringify([]))
        localStorage.removeItem('admin', JSON.stringify([]))
        window.location.reload();
    };

    const localizer = momentLocalizer(moment);

    const setEvent = useCallback((e) => {

        addOneEvent({
            title: e.title,
            start: new Date(Date.parse(e.start)),
            end: new Date(Date.parse(e.end)),
        }).then(res => {
        })
    },);

    const updateEvent = useCallback((el) => {
        updateOneEvent({
            title: el.title,
        }, el.id).then(res => {
        })
    },);

    const getEvents = useCallback(() => {
        getAllEvents().then((res) => {
            setMyEvents(res)
        })
    }, [])

    useEffect(() => {
        getEvents()
    }, [])

    return (
        <div>

            <div className="header_buttons">
                <div className="button_register">
                    <Link to='/register/'>
                        Зарегистрировать новый аккаунт
                    </Link>
                </div>
                <div className="button_login">
                    <button
                        onClick={islogout}
                    >
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
            {admin == 1 ?
                (
                    <Calendar
                        selectable
                        localizer={localizer}
                        events={newEvent}
                        startAccessor="start"
                        endAccessor="end"
                        style={{height: 500}}
                        messages={{
                            next: ">",
                            previous: "<",
                            today: "Сегодня",
                            month: "Месяц",
                            week: "Неделя",
                            day: "День",
                        }}
                        views={['day', 'week', 'month']}
                        onSelectSlot={(e) => handleSelect(e)}
                        popup={true}
                        tooltipAccessor={(e) => e.title}
                        onSelectEvent={(e) => eventSelected(e)}
                    />
                )
                :
                <Calendar
                    selectable
                    localizer={localizer}
                    events={myEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{height: 500}}
                    messages={{
                        next: ">",
                        previous: "<",
                        today: "Сегодня",
                        month: "Месяц",
                        week: "Неделя",
                        day: "День",
                    }}
                    views={['day', 'week', 'month']}
                    onSelectEvent={event => alert(event.title)}
                    //  onSelectSlot={handleSelect}
                    // handleSelect popup={true}
                    //  tooltipAccessor={(e) => e.title}
                    //  onSelectEvent={event => alert(event.title)}
                />
            }

            {!token && <Redirect to="/login/"/>}
        </div>
    );
}

export default BigCalendar;