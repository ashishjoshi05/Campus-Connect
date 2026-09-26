import React, { useState, useEffect } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import { communityService } from '../../services/communityService';
import { Badge } from '../../components/common/Badge';

export const StudentEvents = () => {
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    communityService.getEvents().then(setEvents);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Upcoming Events</h1>
      <div className="grid md:grid-cols-2 gap-4">
        {events.map(event => (
          <div key={event.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <Badge>{event.type}</Badge>
            </div>
            <div className="flex gap-4 text-sm text-slate-500 font-medium mt-4">
              <span className="flex items-center gap-1"><CalendarDays size={16}/> {event.date}</span>
              <span className="flex items-center gap-1"><MapPin size={16}/> {event.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};