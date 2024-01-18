import styles from "./ChatPerson.module.css";

const ChatPerson = () => {
  return (
    <div className={styles.ChatPersonDiv}>
      <div>
        <img
          width={"40px"}
          height={"40px"}
          src="https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg"
          alt="alt"
        />
      </div>
      <div>
        <p className={styles.ChatPersonName}>Rohit Salgar</p>
      </div>
    </div>
  );
};

export default ChatPerson;
