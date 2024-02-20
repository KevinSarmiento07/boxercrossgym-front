import { useTests } from "../../hooks/useTests";
import { TestForm } from "../components/TestForm";
import { TestList } from "../components/TestList";

export const TestPage = () => {
  const { visibleForm } = useTests();
  console.log(visibleForm);
  return (
    <>
      {!visibleForm || <TestForm />}
      <TestList />
    </>
  );
};
