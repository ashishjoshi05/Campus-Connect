import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { communityService } from '../../services/communityService';
import { Badge } from '../../components/common/Badge';

export const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', type: 'Technical', date: '', location: '' });

  const loadEvents = async () => setEvents(await communityService.getEvents());
  useEffect(() => { loadEvents(); }, []);

  const handlePublish = async (e) => {
    e.preventDefault();
    await communityService.createEvent(newEvent);
    setNewEvent({ title: '', type: 'Technical', date: '', location: '' });
    loadEvents();
  };

  const handleDelete = async (id) => {
    await communityService.deleteEvent(id);
    loadEvents();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 bg-white p-6 rounded-xl border border-slate-200 h-fit">
        <h2 className="text-lg font-bold mb-4">Create Event</h2>
        <form onSubmit={handlePublish} className="space-y-4">
          <input required type="text" placeholder="Event Title" className="w-full p-2 border rounded-lg" value={newEvent.title} onChange={e => setNewEvent({...newEvent, title: e.target.value})} />
          <select className="w-full p-2 border rounded-lg" value={newEvent.type} onChange={e => setNewEvent({...newEvent, type: e.target.value})}>
            <option>Technical</option><option>Cultural</option><option>Sports</option>
          </select>
          <input required type="date" className="w-full p-2 border rounded-lg" value={newEvent.date} onChange={e => setNewEvent({...newEvent, date: e.target.value})} />
          <input required type="text" placeholder="Location" className="w-full p-2 border rounded-lg" value={newEvent.location} onChange={e => setNewEvent({...newEvent, location: e.target.value})} />
          <button type="submit" className="w-full bg-brand-600 text-white py-2 rounded-lg hover:bg-brand-700">Create</button>
        </form>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-lg font-bold text-slate-800">Upcoming Events</h2>
        {events.map(ev => (
          <div key={ev.id} className="bg-white p-5 rounded-xl border flex justify-between items-center">
            <div>
              <div className="flex items-center gap-3 mb-1"><h3 className="font-bold">{ev.title}</h3><Badge>{ev.type}</Badge></div>
              <p className="text-sm text-slate-600">{ev.date} • {ev.location}</p>
            </div>
            <button onClick={() => handleDelete(ev.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg"><Trash2 size={18}/></button>
          </div>
        ))}
      </div>
    </div>
  );
};