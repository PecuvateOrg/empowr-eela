import type { RouteInfoProps } from '@/components/RouteInfo';

export const HONOR_OAK_ROUTE: RouteInfoProps = {
  venueName: 'Honor Oak Community Centre',
  address: '50 Turnham Road, London, SE4 2JD',
  ways: [
    {
      icon: 'mdi:train',
      label: 'By train',
      lines: [
        'Crofton Park Station — approx. 9 min walk',
        'Brockley Station — approx. 28 min walk',
      ],
    },
    {
      icon: 'mdi:bus',
      label: 'By bus',
      lines: [
        'Merttins Road — approx. 4 min walk (343, 484, P12, N343)',
        'Brockley Jack — approx. 7 min walk (122, 171, 172, P4, N171)',
      ],
    },
    {
      icon: 'mdi:car',
      label: 'By car',
      lines: [
        'No on-site car park — free on-street parking nearby',
        'Allow extra time to find a space',
      ],
    },
  ],
  note: 'Walking times are approximate — we recommend planning your journey with TfL (tfl.gov.uk/plan-a-journey) before travelling.',
};

export const LADYWELL_ROUTE: RouteInfoProps = {
  venueName: 'The Ladywell Centre',
  address: '148 Dressington Avenue, London, SE4 1JF',
  ways: [
    {
      icon: 'mdi:train',
      label: 'By train',
      lines: [
        'Ladywell Station — approx. 4 min walk',
        'Southeastern services on the Hayes line',
      ],
    },
    {
      icon: 'mdi:bus',
      label: 'By bus',
      lines: [
        'Bus stop within 150m of the venue',
        'Routes 122, 47, P4',
      ],
    },
    {
      icon: 'mdi:car',
      label: 'By car',
      lines: [
        'Free on-site car park, including Blue Badge bays',
        'Located at the front of the building',
      ],
    },
  ],
  note: 'Walking times are approximate — we recommend planning your journey with TfL (tfl.gov.uk/plan-a-journey) before travelling.',
};
