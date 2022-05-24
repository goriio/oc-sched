import {
  Button,
  Card,
  ColorInput,
  MultiSelect,
  Stack,
  TextInput,
} from '@mantine/core';
import { TimeRangeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { uniqueId } from '../utils/uniqueId';
import { isUrl } from '../utils/validate';

export function ScheduleForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  let initialValues = {
    id: uniqueId(),
    subject: '',
    link: '',
    days: [],
    timeRange: [null, null],
    color: '',
  };

  if (id) {
    const schedule = JSON.parse(localStorage.getItem('schedule'));
    const newSchedule = schedule.find((meeting) => meeting.id === id);
    initialValues = {
      ...newSchedule,
      timeRange: [
        new Date(newSchedule.timeRange[0]),
        new Date(newSchedule.timeRange[1]),
      ],
    };
  }

  const scheduleForm = useForm({
    initialValues: initialValues,
    validate: {
      subject: (value) => (value === '' ? 'Subject is required' : null),
      link: (value) =>
        value === ''
          ? 'Link is required'
          : isUrl(value)
          ? null
          : 'Should be valid',
      days: (value) =>
        value.length === 0 ? 'Should have at least picked one' : null,
      timeRange: (value) =>
        value.includes(null) ? 'Time range is required' : null,
    },
  });

  const handleSubmit = scheduleForm.onSubmit((values) => {
    let schedule = JSON.parse(localStorage.getItem('schedule')) || [];

    if (id) {
      schedule = schedule.map((meeting) =>
        meeting.id === id ? values : meeting
      );
    } else {
      schedule = [...schedule, values];
    }

    localStorage.setItem('schedule', JSON.stringify(schedule));
    scheduleForm.reset();
    showNotification({
      title: 'Successful',
      message: `${scheduleForm.getInputProps('subject').value} is ${
        id ? 'edited' : 'added'
      }.`,
    });
    navigate('/');
  });

  return (
    <Card my="md">
      <form onSubmit={handleSubmit}>
        <Stack>
          <TextInput
            label="Subject"
            placeholder="Subject"
            required
            {...scheduleForm.getInputProps('subject')}
          />
          <TextInput
            label="Meeting link"
            placeholder="Enter link"
            required
            {...scheduleForm.getInputProps('link')}
          />
          <MultiSelect
            label="Days"
            placeholder="Pick days"
            data={[
              { value: 0, label: 'Sunday' },
              { value: 1, label: 'Monday' },
              { value: 2, label: 'Tuesday' },
              { value: 3, label: 'Wednesday' },
              { value: 4, label: 'Thursday' },
              { value: 5, label: 'Friday' },
              { value: 6, label: 'Saturday' },
            ]}
            required
            {...scheduleForm.getInputProps('days')}
          />
          <TimeRangeInput
            format="12"
            label="Time"
            clearable
            required
            {...scheduleForm.getInputProps('timeRange')}
          />
          <ColorInput
            label="Color for this subject"
            placeholder="Pick color"
            {...scheduleForm.getInputProps('color')}
          />
          <Button type="submit" onClick={() => scheduleForm.validate()} mt="md">
            {id ? 'Edit' : 'Add'}
          </Button>
          <Button variant="subtle" color="red" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
