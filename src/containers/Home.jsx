import {
  Button,
  Center,
  Group,
  Modal,
  Stack,
  Tabs,
  Text,
  TextInput,
} from '@mantine/core';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Meeting } from '../components/Meeting';
import { hasTimeElapsed, getPartOfTheDay } from '../utils/date';

export function Home() {
  const [name, setName] = useState(localStorage.getItem('name') || '');
  const [nameModalOpen, setNameModalOpen] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [meetingsNow, setMeetingsNow] = useState([]);

  useEffect(() => {
    if (!name) {
      setNameModalOpen(true);
    }
  }, []);

  useEffect(() => {
    const meetings = JSON.parse(localStorage.getItem('schedule')) || [];
    setSchedule(meetings);
  }, []);

  useEffect(() => {
    setMeetingsNow(
      schedule
        .filter((meeting) => {
          return (
            meeting.days.includes(dayjs().day()) &&
            !hasTimeElapsed(meeting.timeRange[1])
          );
        })
        .sort((a, b) => dayjs(a.timeRange[0]).diff(dayjs(b.timeRange[0])))
    );
  }, [schedule]);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('name', name);
    setNameModalOpen(false);
  };

  return (
    <>
      <Modal
        title="How should I call you?"
        opened={nameModalOpen}
        onClose={() => setNameModalOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              aria-label="Enter your name"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <Button type="submit">Submit</Button>
          </Stack>
        </form>
      </Modal>

      <Stack>
        <Group position="apart" mt="md">
          <Text>
            Good {getPartOfTheDay(dayjs().hour())}, {name || 'guest'}.
          </Text>
          <Button component={Link} to="/add">
            Add
          </Button>
        </Group>

        <Tabs grow>
          <Tabs.Tab label="Current">
            <Stack>
              {meetingsNow.length ? (
                meetingsNow.map((meeting) => (
                  <Meeting key={meeting.id} meeting={meeting} />
                ))
              ) : (
                <Center>
                  <Text>No meeting</Text>
                </Center>
              )}
            </Stack>
          </Tabs.Tab>
          <Tabs.Tab label="All Meetings">
            <Stack>
              {schedule.length ? (
                schedule.map((meeting) => (
                  <Meeting key={meeting.id} meeting={meeting} />
                ))
              ) : (
                <Center>
                  <Stack>
                    <Text>No schedule yet</Text>
                    <Button component={Link} to="/add">
                      Add now
                    </Button>
                  </Stack>
                </Center>
              )}
            </Stack>
          </Tabs.Tab>
        </Tabs>
      </Stack>
    </>
  );
}
