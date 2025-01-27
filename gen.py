import itertools

# Функция для генерации всех возможных комбинаций из 2 символов
def generate_domains():
    characters = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for combination in itertools.product(characters, repeat=2):
        yield ''.join(combination) + '.ru'

# Основная функция
def main():
    # Сохранить все домены в файл
    with open('all_domains.txt', 'w') as file:
        for domain in generate_domains():
            file.write(domain + '\n')
            print(f"Домен {domain} добавлен в список")

if __name__ == "__main__":
    main()