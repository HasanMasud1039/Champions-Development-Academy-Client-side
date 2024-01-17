const SectionTitle = ({heading, subheading}) => {
    return (
        <div className="md:w-4/12 my-4 text-center font-bold mx-auto space-y-2">
            <p style={{fontFamily: 'Playfair Display'}} className="text-fuchsia-600 md:text-xl dark:text-orange-500">--- {subheading} ---</p>
            <h3 className="text-xl md:text-3xl  text-fuchsia-800 dark:text-orange-600 uppercase border-y-4 py-4">{heading}</h3>
        </div>
    );
};

export default SectionTitle;