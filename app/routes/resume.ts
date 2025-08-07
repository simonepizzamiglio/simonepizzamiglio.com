import { redirect } from 'react-router';

export async function loader() {
  return redirect('/simone-pizzamiglio-resume.pdf');
}
