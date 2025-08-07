import { parseWithZod } from '@conform-to/zod/v4';
import { type ActionFunctionArgs, data, redirect } from 'react-router';
import { setTheme } from '~/lib/theme.server';
import { ThemeFormSchema } from '~/lib/theme';

export async function loader() {
  return redirect('/');
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const submission = parseWithZod(formData, {
    schema: ThemeFormSchema,
  });

  if (submission.status !== 'success') {
    return data(
      { result: submission.reply() },
      { status: submission.status === 'error' ? 400 : 200 },
    );
  }
  const { theme } = submission.value;

  const responseInit = {
    headers: { 'set-cookie': setTheme(theme) },
  };
  return data({ success: true, submission }, responseInit);
}
