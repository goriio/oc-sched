import { Anchor, Badge, Card, Group, Stack, Text, Title } from '@mantine/core';
import { convertWeekDay, formatTime } from '../utils/date';

export function Meeting({ meeting }) {
  return (
    <Card>
      <Stack>
        <Anchor
          href={meeting.link}
          sx={{ fontSize: '1.25rem', fontWeight: 'bold', color: meeting.color }}
          rel="noreferrer noopener"
          target="_blank"
        >
          {meeting.subject}
        </Anchor>
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
