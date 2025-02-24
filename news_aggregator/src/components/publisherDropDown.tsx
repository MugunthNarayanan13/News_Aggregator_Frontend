import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { allPublishersURL } from "@/utils/urls";

interface Publisher {
  id: string;
  name: string;
}

interface SingleSelectDropdownPublishersProps {
  onSelect: (selectedPublisher: string | null) => void;
}

const SingleSelectDropdownPublishers: React.FC<SingleSelectDropdownPublishersProps> = ({ onSelect }) => {
  const [publishers, setPublishers] = useState<Publisher[]>([]);
  const [selectedOption, setSelectedOption] = useState<{ label: string; value: string } | null>(null);

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axios.get(allPublishersURL(["in"], ["en"]));
        if (response.data.status === "success") {
          const publisherList: Publisher[] = response.data.results.map((item: any) => ({
            id: item.id,
            name: item.name,
          }));
          setPublishers(publisherList);
        }
      } catch (error) {
        console.error("Error fetching publishers:", error);
      }
    };

    fetchPublishers();
  }, []);

  const handleChange = (selected: { label: string; value: string } | null) => {
    setSelectedOption(selected);
    onSelect(selected ? selected.value : null);
  };

  return (
    <Select
    className="flex-1"
      options={publishers.map((publisher) => ({ label: publisher.name, value: publisher.name }))}
      value={selectedOption}
      onChange={handleChange}
      placeholder="Select Publisher..."
      isClearable
    />
  );
};

export default SingleSelectDropdownPublishers;
