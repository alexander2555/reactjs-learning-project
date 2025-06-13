export const UserContacts = ({ email, phone }) => {
  return (
    <div>
      <h3>Контакты</h3>
      <div>Почта: {email}</div>
      <div>Телефон: {phone}</div>
    </div>
  );
}