import {
  Anchor,
  Badge,
  Card,
  Group,
  Indicator,
  Stack,
  Text,
} from '@mantine/core';
import { convertWeekDay, formatTime, isTimeRangeNow } from '../utils/date';

export function Meeting({ meeting }) {
  return (
    <Card>
      <Stack>
        <Group>
          <Anchor
            href={meeting.link}
            sx={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              color: meeting.color,
            }}
            rel="noreferrer noopener"
            target="_blank"
          >
            <Text>{meeting.subject}</Text>
          </Anchor>
          {isTimeRangeNow(meeting.timeRange) && (
            <Badge color="green">Now</Badge>
          )}
        </Group>
        <Text>
          {formatTime(meeting.timeRange[0])} -{' '}
          {formatTime(meeting.timeRange[1])}
        </Text>

        <Group>
          {meeting.days.map((day) => (
            <Badge key={day}>{convertWeekDay(day)}</Badge>
          ))}
        </Group>
      </Stack>
    </Card>
  );
}
