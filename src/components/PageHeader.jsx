import useTheme from "../hooks/useTheme";

const PageHeader = ({ title, children }) => {
  const { theme } = useTheme();
  return (
    <div
      className={`h-[400px] text-center grid place-content-center bg-cover bg-fixed bg-center border-neutral/10 ${
        theme === "dark" ? "page-header-dark" : "page-header-light"
      }`}
    >
      <div>
        <h1 className="text-5xl font-bold gradient-text mb-4">{title}</h1>
        <div className="breadcrumbs w-fit mx-auto">
          <ul>{children}</ul>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
