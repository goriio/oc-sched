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
import { useNavigate } from 'react-router-dom';
import { uniqueId } from '../utils/uniqueId';
import { isUrl } from '../utils/validate';

export function ScheduleForm() {
  const navigate = useNavigate();
  const scheduleForm = useForm({
    initialValues: {
      subject: '',
      link: '',
      days: [],
      timeRange: [null, null],
      color: '',
    },
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

  return (
    <Card my="md">
      <form
        onSubmit={scheduleForm.onSubmit((values) => {
          const schedule = JSON.parse(localStorage.getItem('schedule')) || [];
          console.log(schedule);
          localStorage.setItem(
            'schedule',
            JSON.stringify([...schedule, { id: uniqueId(), ...values }])
          );
          scheduleForm.reset();
          showNotification({
            title: 'Successful',
            message: `${scheduleForm.getInputProps('subject').value} is added.`,
          });
        })}
      >
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
            Add
          </Button>
          <Button variant="subtle" color="red" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Stack>
      </form>
    </Card>
  );
}
