const SectionTitle = ({heading, subheading}) => {
    return (
        <div className="md:w-4/12 my-4 text-center font-bold mx-auto">
            <p className="text-fuchsia-600 md:text-xl">--- {subheading} ---</p>
            <h3 className="text-xl md:text-3xl  text-fuchsia-800 uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;