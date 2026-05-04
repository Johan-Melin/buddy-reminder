create table if not exists contacts (
  id text primary key,
  name text not null,
  relationship text not null check (relationship in ('family', 'friend', 'colleague', 'other')),
  target_frequency_days integer not null check (target_frequency_days > 0),
  created_at timestamptz not null,
  updated_at timestamptz not null
);

create table if not exists contact_events (
  id text primary key,
  contact_id text not null references contacts(id) on delete cascade,
  date timestamptz not null,
  method text not null check (method in ('phone', 'message', 'meeting', 'other'))
);

insert into contacts (
  id,
  name,
  relationship,
  target_frequency_days,
  created_at,
  updated_at
) values
  ('1', 'John Doe', 'family', 14, '2026-01-10T09:15:00.000Z', '2026-04-28T18:45:00.000Z'),
  ('2', 'Jane Doe', 'friend', 14, '2025-12-22T14:00:00.000Z', '2026-04-10T16:20:00.000Z'),
  ('3', 'Jim Doe', 'colleague', 7, '2026-02-01T07:50:00.000Z', '2026-04-30T09:10:00.000Z'),
  ('4', 'Jill Doe', 'other', 30, '2025-11-18T11:25:00.000Z', '2026-03-02T10:05:00.000Z'),
  ('5', 'Jack Doe', 'family', 30, '2026-01-28T20:10:00.000Z', '2026-04-15T07:35:00.000Z'),
  ('6', 'Jill Doe', 'friend', 60, '2025-10-05T15:40:00.000Z', '2026-02-21T21:00:00.000Z'),
  ('7', 'Jill Doe', 'friend', 14, '2026-03-08T08:05:00.000Z', '2026-05-01T12:00:00.000Z')
on conflict (id) do nothing;

insert into contact_events (
  id,
  contact_id,
  date,
  method
) values
  ('1', '3', '2026-02-03T19:30:00.000Z', 'phone'),
  ('2', '6', '2026-03-14T12:15:00.000Z', 'message'),
  ('3', '3', '2026-04-27T08:00:00.000Z', 'meeting')
on conflict (id) do nothing;
