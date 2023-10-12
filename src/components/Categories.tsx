export const Categories = ({
  categoryId,
  onClickCategory,
}: {
  categoryId: number;
  onClickCategory: (index: number) => void;
}) => {
  const categories = [
    {
      id: 0,
      name: "Все",
      index: 0,
    },
    { id: 1, name: "Мясные", index: 1 },
    { id: 2, name: "Вегетарианские", index: 2 },
    { id: 3, name: "Гриль", index: 3 },
    { id: 4, name: "Острые", index: 4 },
    { id: 5, name: "Закрытые", index: 5 },
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => onClickCategory(category.index)}
            className={categoryId === category.index ? "active" : ""}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};
