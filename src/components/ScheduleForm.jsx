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
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ScheduleContext } from '../contexts/schedule-context';
import { uniqueId } from '../utils/uniqueId';
import { isUrl } from '../utils/validate';

export function ScheduleForm() {
  const { schedule, setSchedule } = useContext(ScheduleContext);
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
        value.includes(null) ?  'Time range is required' : value[0] > value[1] ? 'Time range should be valid' : null,
    },
  });

  const handleSubmit = scheduleForm.onSubmit((values) => {
    if (id) {
      setSchedule((current) =>
        current.map((meeting) => (meeting.id === id ? values : meeting))
      );
    } else {
      setSchedule((current) => [...current, values]);
    }

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
