import './SectionTitle.css';

function SectionTitle({ customClass = "", title }) {
  return (
    <h2 className={"section-title " + customClass}>{ title }</h2>
  );
}

export default SectionTitle;
