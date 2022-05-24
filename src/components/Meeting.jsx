import { Anchor, Badge, Card, Group, Menu, Stack, Text } from '@mantine/core';
import { Trash } from 'tabler-icons-react';
import { convertWeekDay, formatTime, isTimeRangeNow } from '../utils/date';

export function Meeting({ meeting, onDelete }) {
  return (
    <Card>
      <Stack>
        <Group position="apart" align="start" spacing="lg" noWrap>
          <Group>
            <Anchor
              href={meeting.link}
              sx={{
                fontWeight: 'bold',
                color: meeting.color,
              }}
              rel="noreferrer noopener"
              target="_blank"
            >
              {meeting.subject}
            </Anchor>
            {isTimeRangeNow(meeting.timeRange) && (
              <Badge color="green">Now</Badge>
            )}
          </Group>
          <Menu>
            <Menu.Item
              color="red"
              icon={<Trash size={16} />}
              onClick={() => onDelete(meeting.id)}
            >
              Delete
            </Menu.Item>
          </Menu>
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
